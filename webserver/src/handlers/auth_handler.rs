use actix_web::{post, web, HttpResponse, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

#[post("/login")]
pub async fn login(credentials: web::Json<LoginRequest>) -> impl Responder {
    // Implement authentication logic
    HttpResponse::Ok().finish()
}
