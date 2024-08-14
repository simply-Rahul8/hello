use reqwest::Client;
use serde::{Deserialize, Serialize};
// use tokio::net::windows::named_pipe::PipeEnd::Client;

#[derive(Serialize, Deserialize)]
struct MatchRequest {
    description: String,
}

pub async fn match_consultant(description: &str) -> Result<String, reqwest::Error> {
    let client = Client::new();
    let request = MatchRequest {
        description: description.to_string(),
    };
    let response = client
        .post("http://ai_service/match")
        .json(&request)
        .send()
        .await?
        .text()
        .await?;

    Ok(response)
}
