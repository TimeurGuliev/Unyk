cmake_minimum_required(VERSION 3.20)
project(practice_case4 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Prefer a locally installed package. Otherwise fetch a pinned upstream release.
find_package(GTest 1.14 CONFIG QUIET)
if(NOT GTest_FOUND)
  include(FetchContent)
  set(INSTALL_GTEST OFF CACHE BOOL "" FORCE)
  set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
  FetchContent_Declare(googletest
    URL https://github.com/google/googletest/archive/refs/tags/v1.14.0.zip)
  FetchContent_MakeAvailable(googletest)
endif()

# By default compile the test code only: factory definitions are intentionally absent.
add_library(case4_test_objects OBJECT tests/structures_test.cpp)
target_include_directories(case4_test_objects PRIVATE include)
target_link_libraries(case4_test_objects PRIVATE GTest::gtest)

set(CASE4_IMPLEMENTATION "" CACHE FILEPATH
    "Path to a C++ source defining the three factories and their implementations")
if(CASE4_IMPLEMENTATION)
  if(NOT EXISTS "${CASE4_IMPLEMENTATION}")
    message(FATAL_ERROR "CASE4_IMPLEMENTATION does not exist: ${CASE4_IMPLEMENTATION}")
  endif()
  add_executable(case4_tests $<TARGET_OBJECTS:case4_test_objects> "${CASE4_IMPLEMENTATION}")
  target_include_directories(case4_tests PRIVATE include)
  target_link_libraries(case4_tests PRIVATE GTest::gtest_main)
  enable_testing()
  include(GoogleTest)
  gtest_discover_tests(case4_tests)
endif()

