import os

def merge_folder_contents(output_filename="merged_output.txt", target_directory="."):
    output_path = os.path.abspath(os.path.join(target_directory, output_filename))
    
    with open(output_path, "w", encoding="utf-8") as outfile:
        for root, _, files in os.walk(target_directory):
            for file in sorted(files):
                file_path = os.path.join(root, file)
                abs_file_path = os.path.abspath(file_path)
                
                # Skip the output file itself to prevent recursion
                if abs_file_path == output_path:
                    continue
                
                # Relative path for cleaner headers
                rel_path = os.path.relpath(file_path, target_directory)
                
                outfile.write(f"\n{'=' * 60}\n")
                outfile.write(f"FILE: {rel_path}\n")
                outfile.write(f"{'=' * 60}\n\n")
                
                try:
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as infile:
                        outfile.write(infile.read())
                        outfile.write("\n")
                except Exception as e:
                    outfile.write(f"[Skipped non-text file or read error: {e}]\n")

    print(f"All file contents combined successfully into: {output_filename}")

if __name__ == "__main__":
    merge_folder_contents()