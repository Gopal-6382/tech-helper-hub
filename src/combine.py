import os

def merge_folder_contents(output_filename="merged_output.txt", target_directory="."):
    output_path = os.path.abspath(os.path.join(target_directory, output_filename))

    with open(output_path, "w", encoding="utf-8") as outfile:
        for root, _, files in os.walk(target_directory):
            for file in sorted(files):
                file_path = os.path.join(root, file)

                if os.path.abspath(file_path) == output_path:
                    continue

                rel_path = os.path.relpath(file_path, target_directory).replace("\\", "/")

                try:
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as infile:
                        content = infile.read().strip()
                except Exception:
                    continue

                if not content:
                    continue

                outfile.write(f"# {rel_path}\n")
                outfile.write(content)
                outfile.write("\n\n")

    print(f"Combined into: {output_filename}")


if __name__ == "__main__":
    merge_folder_contents()