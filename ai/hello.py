import argparse


def get_args():
    """get the command line arguments"""
    parser = argparse.ArgumentParser(
        description="Hello name",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument("-n", "--name", metavar="str", type=str, default=None)
    args = parser.parse_args()
    return args


def main():
    """Dance with Jazz~~"""
    args = get_args()

    print(f"Hello {args.name}")


if __name__ == "__main__":

    main()
