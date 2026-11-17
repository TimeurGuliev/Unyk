#pragma once

#include <memory>
#include <optional>

// Contracts only: there is deliberately no data-structure implementation here.
namespace practice {

class Queue {
public:
    virtual ~Queue() = default;
    virtual void push(int value) = 0;
    // Remove and return the oldest value; return nullopt when empty.
    virtual std::optional<int> pop() = 0;
};

class Heap {
public:
    virtual ~Heap() = default;
    virtual void push(int value) = 0;
    // Min-heap: remove and return the smallest value; nullopt when empty.
    virtual std::optional<int> pop() = 0;
};

class BinarySearchTree {
public:
    virtual ~BinarySearchTree() = default;
    // Set semantics: inserting an existing key has no additional effect.
    virtual void push(int value) = 0;
    virtual bool search(int value) const = 0;
    // Remove the given key, returning false if it was absent.
    virtual bool pop(int value) = 0;
};

// A separately supplied implementation must define all three factories.
std::unique_ptr<Queue> make_queue();
std::unique_ptr<Heap> make_heap();
std::unique_ptr<BinarySearchTree> make_binary_search_tree();

}  // namespace practice

