use std::cell::RefCell;

thread_local! {
    //not used
    static WPISY: RefCell<Vec<String>> = RefCell::default();
}

#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

//not used
#[ic_cdk::update]
fn dodaj_wpis(wpis: String) {
    WPISY.with(|wpisy| {
        let mut mutable_wpisy = wpisy.borrow_mut();
        mutable_wpisy.push(wpis);
    });
}

//not used
#[ic_cdk::query]
fn pobierz_wpisy() -> Vec<String>{
    WPISY.with(|wpisy| wpisy.borrow().clone())
}

ic_cdk::export_candid!();