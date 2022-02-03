#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;

// Create the command
#[tauri::command]
fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }

  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

fn main() {
  tauri::Builder::default()
    // Add close splashscreen command
    .invoke_handler(tauri::generate_handler![close_splashscreen])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
