use crate::{db::DbPool, services::user_service};
use actix_web::{post, web, HttpResponse, Responder};

use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

#[post("/register")]
pub async fn register(
    pool: web::Data<DbPool>,
    credentials: web::Json<LoginRequest>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection.");
    match user_service::register_user(&mut conn, &credentials.username, &credentials.password).await
    {
        Ok(user) => HttpResponse::Created().json(user),
        Err(error) => {
            log::error!("Failed to create new User: {:?}", error);
            HttpResponse::InternalServerError().json("Error creating new User")
        }
    }
}

#[post("/login")]
pub async fn login(
    pool: web::Data<DbPool>,
    credentials: web::Json<LoginRequest>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection.");
    match user_service::login(&mut conn, &credentials.username, &credentials.password).await {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(error) => {
            log::error!("Failed to login User: {:?}", error);
            HttpResponse::Unauthorized().json("Invalid username or password")
        }
    }
}
