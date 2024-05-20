// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::str;
use std::process::{Command, Stdio};


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn check_docker_status() -> String {

    let output = if cfg!(target_os = "windows") {
        Command::new("powershell")
            .args(&["-Command", "docker info --format '{{json .}}'"])
            .stdout(Stdio::piped()) 
            .stderr(Stdio::piped())
            .output()
            .expect("failed to execute process")
    } else {
        Command::new("sh")
            .arg("-c")
            .arg("docker info --format '{{json .}}'")
            .stdout(Stdio::piped()) 
            .stderr(Stdio::piped())
            .output()
            .expect("failed to execute process")
    };

    if output.status.success() {
        let stdout = str::from_utf8(&output.stdout).expect("failed to convert to string");

        format!("{:?}", stdout)
    } else {

        format!("Docker not available")
    }

}

#[tauri::command]
fn get_containers_docker() -> String {

    let output = if cfg!(target_os = "windows") {
        Command::new("powershell")
            .args(&["-Command", "docker ps --format '{{json .}}' | ConvertFrom-Json | Select-Object ID, Names, Image, Status, Ports, State, CreatedAt, RunningFor | ConvertTo-Json"])
            .stdout(Stdio::piped()) 
            .stderr(Stdio::piped())
            .output()
            .expect("failed to execute process")
    } else {
        Command::new("sh")
            .arg("-c")
            .arg("docker info --format '{{json .}}'")
            .stdout(Stdio::piped()) 
            .stderr(Stdio::piped()) 
            .output()
            .expect("failed to execute process")
    };

    if output.status.success() {
        let stdout = str::from_utf8(&output.stdout).expect("failed to convert to string");

        format!("{:?}", stdout)
    } else {

        format!("Error on fetch containers docker")
    }
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![check_docker_status, get_containers_docker])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
