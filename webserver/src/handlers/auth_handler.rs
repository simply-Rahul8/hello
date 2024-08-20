use actix_web::{post, web, HttpResponse, Responder};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{models::user::NewUser, schema::users};

#[derive(Deserialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

#[post("/register")]
pub async fn register(
    conn: &mut PgConnection,
    credentials: web::Json<LoginRequest>,
) -> impl Responder {
    let user = diesel::insert_into(users::table)
        .values(&NewUser {
            username: &credentials.username,
            password_hash: &credentials.password,
        })
        .returning(users::all_columns)
        .get_result(conn)
        .expect("Error saving new user");
    HttpResponse::Ok().json(user)
}
