import math

def get_positive_integer():
    while True:
        try:
            user_input = input("Введите положительное целое число: ")
            number = int(user_input)
            if number < 0:
                raise ValueError("Число должно быть неотрицательным.")
            return number
        except ValueError as e:
            print(f"Ошибка: {e}. Попробуйте снова.")

def calculate_factorial(n):
    return math.factorial(n)

def main():
    number = get_positive_integer()
    result = calculate_factorial(number)
    print(f"Факториал числа {number} равен {result}")

if __name__ == "__main__":
    main()