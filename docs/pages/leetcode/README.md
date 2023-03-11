# leetcode
# 1. (144)二叉树的前序遍历
```java
public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    preOrder(root, res);
    return res;
}

private void preOrder(TreeNode root, List<Integer> res) {
    if (root == null) {
        return;
    }
    res.add(root.val);
    preOrder(root.left, res);
    preOrder(root.right, res);
}
```

# 2. (206)反转链表
```java
class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
}
```

# 3. (322)零钱兑换
```java
public class CoinChange {
    public static int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        // dp[i] ：i块钱有几种方法
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;
        for (int coin : coins) {
            for (int money = coin; money < amount + 1; money++) {
                // dp[money] : 金额为money的有几种方法
                // dp[money-coin] 当前 money金额 - 当前coin面额 的有几种 + 1
                // 两者取小的 
                // 状态转移公式（递推公式）
                dp[money] = Math.min(dp[money], dp[money - coin] + 1);
            }
        }
        int result = dp[amount] > amount ? -1 : dp[amount];
        return result;
    }
}
```

# 4. (1)两数之和
```java
class Solution {
    // O(n2)
    public int[] twoSum1(int[] nums, int target) {
        Map map = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(target - nums[i])) {
                return new int[]{(int) map.get(target - nums[i]), i};
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
    // O(n)
	public int[] twoSum2(int[] nums, int target) {
		for (int i = 0; i < nums.length; i++) {
			for (int j = i + 1; j < nums.length; j++) {
				int count = nums[i] + nums[j];
				if (count == target) {
					return new int[]{i, j};
				}
			}
		}
		return new int[0];
	}
}
```

# 5. (704)二分查找
```java
class Solution {
    public int search(int[] nums, int target) {
        int pivot = 0;
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            pivot = left + ((right - left) / 2);
            if (nums[pivot] == target) {
                return pivot;
            }
            if (nums[pivot] < target) {
                left = pivot + 1;
            } else {
                right = pivot - 1;
            }
        }
        return -1;
    }
}
```

# 6. (70)爬楼梯
```java
class Solution {
    public int climbStairs(int n) {
        if (n <= 1) {
            return n;
        }
        int dp[] = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i < n + 1; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
```

# 7. (128) 最长连续序列
```java
class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> num_set = new HashSet<Integer>();
        for (int num : nums) {
            num_set.add(num);
        }
        int longestStreak = 0;
        for (int num : num_set) {
            if (!num_set.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;
                while (num_set.contains(currentNum + 1)) {
                    currentNum += 1;
                    currentStreak += 1;
                }
                longestStreak = Math.max(longestStreak, currentStreak);
            }
        }
        return longestStreak;
    }
}
```

# 8. (129)求根到叶子节点数字之和
```java
class Solution {
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }

    public int dfs(TreeNode root, int prevSum) {
        if (root == null) {
            return 0;
        }
        int sum = prevSum * 10 + root.val;
        if (root.left == null && root.right == null) {
            return sum;
        } else {
            return dfs(root.left, sum) + dfs(root.right, sum);
        }
    }
}
```
