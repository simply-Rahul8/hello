use actix_web::{post, web, HttpResponse, Responder};
use serde::Deserialize;

use crate::{database::db::DbPool, services::user_service};

#[derive(Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
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
