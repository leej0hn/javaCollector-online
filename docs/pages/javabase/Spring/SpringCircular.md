# 理解Spring循环依赖设计

## 1.前言

什么是循环依赖呢？我们抛开Spring这个框架来聊下什么是循环依赖，循环依赖可能在我们平时的开发过程中是属于比较常见的。Spring容器最大的功能就是对bean的生命周期进行管理，每个bean在创建的过程中，需要得到一个完整的bean需要对bean的所有属性进行赋值，如果两个bean出现了相互依赖的情况，如果Spring没有处理循环依赖，那么出现的结果就是在bean的创建过程中出现相互依赖，导致这个bean永远无法创建出来，则就导致一直在相互创建，那么Spring是如何来解决循环依赖的呢？

## 2. 什么情况下会循环依赖

1.先看如下demo: B和A相互循环依赖

```java
@Component
public class B {
    @Autowired
    private A a;
}

@Component
public class A {
    @Autowired
    private B b;
}
```

启动项目：结果没有报错。

1. 加入异步逻辑修改

```java
@Component
public class A {
    @Autowired
    private B b;
   @Async
    public void test(){

    }
}

@Component
public class B {
    @Autowired
    private A a;
}
@EnableAsync
public class App {
    public static void main(String[] args) {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(App.class);
    }

}
```

启动后：![图片](./SpringCircular.assets/640-167819764563966.png)

解决方案：加入lazy注解：

```java
@Component
public class B {
    @Autowired
    @Lazy
    private A a;
}
@Component
public class A {
    @Autowired
    private B b;
   @Async
    public void test(){

    }
}
```

启动后：没有异常

上面发现使用@Async异步注解，循环依赖就会报错，有可能是因为有了@Async注解修饰的方法，其对应的类被代理了，那代理了就会报错么？我们继续尝试事务注解看看。

```java
@Component
public class A {
    @Autowired
    private B b;
    @Transactional
    public void test(){

    }
}

@Component
public class B {
    @Autowired
    private A a;
}
@EnableTransactionManagement
public class App {
    public static void main(String[] args) {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(App.class);
    }

}
```

启动后：正常，没有报错。

于是我们不经要问：

1. 循环依赖本来不会报错，为何添加@Async异步注解后就会导致报错
2. 为何添加@Transactional注解就不会报错
3. 使用了@Async异步注解的循环依赖，为何可以使用@lazy注解解决

我们要想清楚上面的问题，就需要了解Bean的生命周期。

## 3. 简述Bean的生命周期

一个简单的Bean生命周期如下：

![图片](./SpringCircular.assets/640.png)

问题出现就属性赋值这里：

![图片](./SpringCircular.assets/640-16781975621051.png)

由图我们知道，当B也依赖A时，需要去容器中找到A，A已经实例化了，只是还没属性赋值，所以，不应该再实例化，

解决方案：在A创建的实例化后，用一个map存起来A来不就行了么？于是有了二级缓存

![图片](./SpringCircular.assets/640-16781975621052.png)

似乎上面已经可以解决循环依赖了，但细想一下我们会发现问题：

![图片](./SpringCircular.assets/640-16781975621053.png)

通过上面的逻辑，我们发现了问题所在，B赋值属性A时，如果从Map中直接获取，那么得到的是原生对象，如果后续A没有被代理，一切没问题，

如果A被代理了，那么B得到的对象就不对了，怎么解决，如果我们将aop提前是不是解决了问题。

![图片](./SpringCircular.assets/640-16781975621064.png)

由于A对象的Aop方式提前了，那么B依赖的A就是代理对象了，A对象执行赋值后，后续到Aop这一步，会判断是否已经AOP过了，是的话就不会再Aop了，

问题来了:如果C也跟A相互依赖，难道C去依赖A时，也要通过ObjectFactory获取A的代理对象么？

如果是这样，A就存在2个代理对象了，A是单例的，因此这样不行，于是产生了一个新的缓存，我们称之为三级缓存。

![图片](./SpringCircular.assets/640-16781975621065.png)

于是，spring似乎完美解决了循环依赖问题？但为何使用@Async进行异步代理，会报错？

![图片](./SpringCircular.assets/640-16781975621066.png)

我们看看报错的原因就知道：

![图片](./SpringCircular.assets/640-16781975621067.png)

**那为何@Transactional修饰就没问题呢？**

原因是因为：ObjectFactory.getObject()方法可以产生代理对象

为何使用@lazy注解修饰就能解决问题呢？

![图片](./SpringCircular.assets/640-16781975621068.png)

## 4.走进源码

![图片](./SpringCircular.assets/640-16781975621069.png)

![图片](./SpringCircular.assets/640-167819756210610.png)

![图片](./SpringCircular.assets/640-167819756210611.png)

![图片](./SpringCircular.assets/640-167819756210612.png)

![图片](./SpringCircular.assets/640-167819756210713.png)

从源码来看，为何@Aync注解修饰，不能在ObjectFactory.getObject()方法实现代理对象：

![图片](./SpringCircular.assets/640-167819756210714.png)

![图片](./SpringCircular.assets/640-167819756210715.png)

![图片](./SpringCircular.assets/640-167819756210716.png)

而@Tranctional注解相关的处理器

![图片](./SpringCircular.assets/640-167819756210717.png)

![图片](./SpringCircular.assets/640-167819756210718.png)

![图片](./SpringCircular.assets/640-167819756210719.png)

那么问题？如果A已经在getObject()方法后产生了代理类，后续init（）方法后，还会执行代理么？答案是不会了，因为：

![图片](./SpringCircular.assets/640-167819756210720.png)

![图片](./SpringCircular.assets/640-167819756210721.png)

## 5. 总结

![图片](./SpringCircular.assets/image-20230307222636010.png)

processOn流程图(精华)：[spring创建bean流程3](https://www.processon.com/view/link/64073cd591ff683bad854360)