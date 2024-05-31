import argparse

def main():
    parser = argparse.ArgumentParser(description='Process some name.')
    parser.add_argument('name', type=str, help='Name to greet')

    args = parser.parse_args()

    name = args.name
    print(f'Hello {name}')

if __name__ == "__main__":
    main()
