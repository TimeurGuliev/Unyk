#include "structures.hpp"

#include <initializer_list>
#include <gtest/gtest.h>

using practice::make_binary_search_tree;
using practice::make_heap;
using practice::make_queue;

TEST(QueueContract, EmptyPopReturnsNoValue) {
    auto queue = make_queue();
    ASSERT_NE(queue, nullptr);
    EXPECT_FALSE(queue->pop().has_value());
    EXPECT_FALSE(queue->pop().has_value());
}

TEST(QueueContract, SingleValueCanBeRemoved) {
    auto queue = make_queue();
    ASSERT_NE(queue, nullptr);
    queue->push(42);
    EXPECT_EQ(queue->pop(), 42);
    EXPECT_EQ(queue->pop(), std::nullopt);
}

TEST(QueueContract, PreservesFifoIncludingDuplicates) {
    auto queue = make_queue();
    ASSERT_NE(queue, nullptr);
    for (int value : {4, -1, 4, 0}) queue->push(value);
    for (int value : {4, -1, 4, 0}) EXPECT_EQ(queue->pop(), value);
    EXPECT_EQ(queue->pop(), std::nullopt);
}

TEST(QueueContract, InterleavedPushAndPop) {
    auto queue = make_queue();
    ASSERT_NE(queue, nullptr);
    queue->push(1); queue->push(2);
    EXPECT_EQ(queue->pop(), 1);
    queue->push(3);
    EXPECT_EQ(queue->pop(), 2);
    EXPECT_EQ(queue->pop(), 3);
    queue->push(4);
    EXPECT_EQ(queue->pop(), 4);
}

TEST(HeapContract, EmptyPopReturnsNoValue) {
    auto heap = make_heap();
    ASSERT_NE(heap, nullptr);
    EXPECT_EQ(heap->pop(), std::nullopt);
}

TEST(HeapContract, SingleValueCanBeRemoved) {
    auto heap = make_heap();
    ASSERT_NE(heap, nullptr);
    heap->push(7);
    EXPECT_EQ(heap->pop(), 7);
    EXPECT_EQ(heap->pop(), std::nullopt);
}

TEST(HeapContract, ExtractsAscendingValuesIncludingDuplicatesAndNegatives) {
    auto heap = make_heap();
    ASSERT_NE(heap, nullptr);
    for (int value : {5, -2, 5, 0, -9}) heap->push(value);
    for (int value : {-9, -2, 0, 5, 5}) EXPECT_EQ(heap->pop(), value);
    EXPECT_EQ(heap->pop(), std::nullopt);
}

TEST(HeapContract, MaintainsPriorityAfterInterleavedOperations) {
    auto heap = make_heap();
    ASSERT_NE(heap, nullptr);
    heap->push(10); heap->push(3);
    EXPECT_EQ(heap->pop(), 3);
    heap->push(-1); heap->push(8);
    EXPECT_EQ(heap->pop(), -1);
    EXPECT_EQ(heap->pop(), 8);
    EXPECT_EQ(heap->pop(), 10);
}

TEST(TreeContract, EmptyTreeHasNoValuesAndCannotRemove) {
    auto tree = make_binary_search_tree();
    ASSERT_NE(tree, nullptr);
    EXPECT_FALSE(tree->search(10));
    EXPECT_FALSE(tree->pop(10));
}

TEST(TreeContract, FindsPresentAndRejectsAbsentValues) {
    auto tree = make_binary_search_tree();
    ASSERT_NE(tree, nullptr);
    for (int value : {8, 3, 10, 1, 6}) tree->push(value);
    for (int value : {8, 3, 10, 1, 6}) EXPECT_TRUE(tree->search(value));
    for (int value : {-1, 4, 11}) EXPECT_FALSE(tree->search(value));
}

TEST(TreeContract, RemovesLeafWithoutLosingOtherKeys) {
    auto tree = make_binary_search_tree();
    ASSERT_NE(tree, nullptr);
    for (int value : {8, 3, 10, 1, 6}) tree->push(value);
    EXPECT_TRUE(tree->pop(1));
    EXPECT_FALSE(tree->search(1));
    for (int value : {8, 3, 10, 6}) EXPECT_TRUE(tree->search(value));
    EXPECT_FALSE(tree->pop(1));
}

TEST(TreeContract, RemovesNodeWithOneChild) {
    auto tree = make_binary_search_tree();
    ASSERT_NE(tree, nullptr);
    for (int value : {8, 3, 10, 9}) tree->push(value);
    EXPECT_TRUE(tree->pop(10));
    EXPECT_FALSE(tree->search(10));
    for (int value : {8, 3, 9}) EXPECT_TRUE(tree->search(value));
}

TEST(TreeContract, RemovesNodeWithTwoChildren) {
    auto tree = make_binary_search_tree();
    ASSERT_NE(tree, nullptr);
    for (int value : {8, 3, 10, 1, 6, 9, 14, 4, 7}) tree->push(value);
    EXPECT_TRUE(tree->pop(3));
    EXPECT_FALSE(tree->search(3));
    for (int value : {8, 10, 1, 6, 9, 14, 4, 7}) EXPECT_TRUE(tree->search(value));
}

TEST(TreeContract, DuplicateKeysHaveSetSemantics) {
    auto tree = make_binary_search_tree();
    ASSERT_NE(tree, nullptr);
    tree->push(5); tree->push(5);
    EXPECT_TRUE(tree->search(5));
    EXPECT_TRUE(tree->pop(5));
    EXPECT_FALSE(tree->search(5));
    EXPECT_FALSE(tree->pop(5));
    tree->push(5);
    EXPECT_TRUE(tree->search(5));
}

