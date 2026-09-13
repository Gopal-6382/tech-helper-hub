import os

def write_tree(dir_path, file_obj, prefix=""):
    # Directories to ignore so your text file isn't massive
    ignore_dirs = {'.git', 'node_modules', '.next', '__pycache__', 'dist', '.vscode'}
    
    try:
        entries = sorted(os.listdir(dir_path))
    except PermissionError:
        return
        
    # Filter out the ignored directories
    entries = [e for e in entries if e not in ignore_dirs]
    
    for index, entry in enumerate(entries):
        path = os.path.join(dir_path, entry)
        is_last = index == (len(entries) - 1)
        connector = "└── " if is_last else "├── "
        
        file_obj.write(f"{prefix}{connector}{entry}\n")
        
        if os.path.isdir(path):
            extension = "    " if is_last else "│   "
            write_tree(path, file_obj, prefix + extension)

# Create and write to the text file
output_filename = "folder_structure.txt"
with open(output_filename, "w", encoding="utf-8") as f:
    f.write(f"{os.path.basename(os.path.abspath('.'))}/\n")
    write_tree(".", f)

print(f"✅ Folder structure successfully saved to {output_filename}")
