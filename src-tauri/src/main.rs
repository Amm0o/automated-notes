// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet() -> String {
    format!("Hello, TETS! You've been greeted from Rust!")
}

#[tauri::command]
fn create_file(file_path: String, content: String) -> Result<(), String> {
    fs::write(file_path, content)
        .map_err(|err| err.to_string())
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, create_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
