import random

def guess_the_number():
    secret_number = random.randint(1, 100)
    max_attempts = 7
    attempts = 0

    print("Добро пожаловать в игру 'Угадай число'!")
    print("Я загадал число от 1 до 100. Попробуйте угадать его за 7 попыток.")

    while attempts < max_attempts:
        try:
            guess = int(input(f"\nПопытка {attempts + 1}: Введите число: "))
            if guess < 1 or guess > 100:
                print("Пожалуйста, введите число в диапазоне от 1 до 100.")
                continue
        except ValueError:
            print("Ошибка: пожалуйста, введите целое число.")
            continue

        attempts += 1

        if guess < secret_number:
            print("Слишком маленькое число.")
        elif guess > secret_number:
            print("Слишком большое число.")
        else:
            print(f"Поздравляю! Вы угадали число {secret_number} за {attempts} попыток!")
            break
    else:
        print(f"\nВы проиграли. Загаданное число было: {secret_number}")

if __name__ == "__main__":
    guess_the_number()