module.exports = {
    base: '/javaCollector-online/',
    themeConfig: {
        nav: [
            {
                text: '个人',
                link: 'https://github.com/leej0hn'
            }
        ],
        sidebar: [
            {
                title: '欢迎学习',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    {title: "自我介绍", path: "/"}
                ]
            },
            {
                title: "设计模式",
                path: '/pages/design/',
                collapsable: false,
                children: []
            },
            {
                title: "leetcode",
                path: '/pages/leetcode/',
                collapsable: false,
                children: []
            },
            {
                title: "数据结构",
                collapsable: false,
                children: [
                    {
                        title: "B树与B+树",
                        path: '/pages/dataStructure/BTreeAndB+Tree',
                    }
                ]
            },
            {
                title: "java基础",
                collapsable: false,
                children: [
                    {
                        title: "IO",
                        children: [
                            {
                                title: "epoll启蒙指南",
                                path: '/pages/javabase/IO/epoll_1',
                            }
                        ]
                    },
                    {
                        title: "JVM",
                        children: [
                            {
                                title: "概述JVM",
                                path: '/pages/javabase/JVM/JVM_1',
                            }
                        ]
                    },
                    {
                         title: "Spring",
                         children: [
                             {
                                 title: "理解Spring循环依赖设计",
                                 path: '/pages/javabase/Spring/SpringCircular',
                             }
                         ]
                    }
                ]
            },
            {
                title: "advanced",
                path: '/pages/advanced/',
                collapsable: false,
                children: [
                    {
                        title: "Zookeeper",
                        children: [
                            {
                                title: "Zookeeper启蒙指南",
                                path: '/pages/advanced/Zookeeper/Zookeeper_1',
                            },
                            {
                                title: "图解Zookeeper服务注册",
                                path: '/pages/advanced/Zookeeper/Zookeeper_2',
                            }
                        ]
                    },{
                        title: "MySQL",
                        children: [
                            {
                                title: "MySQL简介",
                                path: '/pages/advanced/MySQL/MySQL_1',
                            },
                            {
                                title: "MySQL索引",
                                path: '/pages/advanced/MySQL/MySQL_2',
                            }
                        ]
                    }
                ]
            }
        ]
    }
}