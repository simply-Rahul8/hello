use crate::db::DbPool;
use actix_web::{post, web, HttpResponse, Responder};
use serde::Deserialize;

use crate::services::task_service;

#[derive(Deserialize)]
pub struct CreateTaskRequest {
    description: String,
    reward: i64,
}

#[post("")]
pub async fn create_task(
    pool: web::Data<DbPool>,
    task: web::Json<CreateTaskRequest>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection.");
    match task_service::create_task(&mut conn, &task.description, &task.reward).await {
        Ok(task) => HttpResponse::Ok().json(task),
        Err(_) => HttpResponse::InternalServerError().json("Error creating new task"),
    }
}
