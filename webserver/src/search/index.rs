use serde::Serialize;
use crate::{services::search_service, search::state::SearchState};

pub (crate) fn index_docs<Doc: Serialize>(
    mut docs : Vec<Doc>,
    search_state : SearchState,
    collection_name: &str
) -> Result<(), reqwest::Error> {
    if docs.is_empty(){
        return Ok(());
    }

    let url = format!("{}/collections/{}/documents", search_state.typesense_url, collection_name);
    let batch_url = format!("{}/collections/{}/documents/import?action=create", search_state.typesense_url, collection_name);

    let body = serde_json::json!(docs.get(0));
    docs.remove(0);
    let batch_body = serde_json::json!(docs);
    
    // Insert first document for schema definition followed by bulk import
    search_service::insert_single_doc(&search_state, url, body)?;
    search_service::insert_batch_docs(&search_state, batch_url, batch_body)?;
    Ok(())
}
