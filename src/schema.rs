use diesel::table;

table! {
    tasks (id) {
        id -> Integer,
        description -> Text,
        reward -> BigInt,
        completed -> Bool,
    }
}

table! {
    users (id) {
        id -> Int4,
        username -> Varchar,
        password_hash -> Varchar,
    }
}
