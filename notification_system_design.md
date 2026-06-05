# Stage 1

## Priority Inbox Design

Priority Order:

Placement > Result > Event

If two notifications have same priority,
latest notification comes first.

## Approach

1. Fetch notifications from API
2. Assign weights
3. Sort by weight
4. Sort by timestamp
5. Show Top 10 notifications

## Efficient Maintenance

Use Min Heap of size 10.

Time Complexity:
O(n log n)