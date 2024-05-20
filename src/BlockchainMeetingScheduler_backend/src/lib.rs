use std::cell::RefCell;
//use std::collections::HashMap;
use std::thread_local;
use std::collections::HashMap;
//use chrono::{Utc};
use sha2::{Sha512, Digest};
//use rand::Rng;

thread_local! {
    //it works all the time canister work
    //here needs to be created database and then access from it should be only possible thru functions
    //database layout:
    //basic overview: All data about meeting should be located in a database, also the data about added availabilities
    //SQL like thinking: we have a whole DB named Meeting in which we are storing all data about the meeting 
    //as an unique ID works randomly generated String HashMap<String (this), Meeting> the Meeting part of HashMap
    //is just an struckt containing all data about particular meeting:

    //database
    static DB: RefCell<HashMap<String, Meeting>> = RefCell::new(HashMap::new());
    //end
    static WPISY: RefCell<Vec<String>> = RefCell::default();
}



#[derive(Debug)]
struct Date {
    year: i32,
    month: u8,
    day: u8,
}

#[derive(Debug)]
struct Users {
    //name of the user
    name: String,
    //public key from II
    user_public_key: String,
    //a double array with all dates
    //the thing is to think if there isnt a better way to store this data
    //frontend data is formatted as a double array on both entrance and exit
    dates: Vec<Vec<u8>>,
    //acctually we just want to store this data here all the modifications
    //and factual operations are going to be performed by frontend canister
    //assuming this, it will be the best way to store the data
    //THIS STRUCTURE MUST BE LIKE THAT CAUSE OF THE FINAL DATA STRUCTURE THAT WE USE INSIDE FRONTEND 
}

#[derive(Debug)]
struct Meeting {
    //name of the meeting:
    name: String,
    //hours of the meeting:
    starting_hour: u8,
    ending_hour: u8,
    //description of the meeting:
    description: String,
    //date:
    //vector of structs
    date_data: Vec<Date>,
    //data about users:
    //vector of structs
    users_data: Vec<Users>,
}


//DOCUMENTATION
//
//
//README before modifying DB:!!!
//
//to access the particular element inside DB you need to have its unique ID
//(which is String element in HashMap), then you gain access to Meeting element which is
//just a DB like construct (created using structs) inside the Meeting element are there
//all information about the meeting and also data that is modified when canister works
//
//date_data - is containing of a VECTOR of Date struct which has particular info about
//every date that was proposed for the meeting during meeting-creator usage by user
//
//users_data - the only element that is really modified during work of canister - 
//the Meeting struct contains of Vector of User structs. Here are there all the information 
//about the users
//
//
//
//README before modifying React Router:!!!
//
//the mechanism of accessing the meeting:
//
//when we try to access a particular meeting we are doing it by changing or 
//just creating a link: <canister.id>/meeting-add-:uuid || <canister.id>/meeting-view-:uuid
//then this uuid component is passed as a variable to meeting-number-add || meeting-number-view
//module we collect it inside componenent by changing function to const 
//const Name = ({ match }) => { const { uuid } = match.params; } and then we collect all necessary
//information from DB and use them during fronent component creation for this particular uuid
//
//the mechanism of creating the meeting:
//
//If the user is creating a meeting we need to create a unique ID and then pass all the important
//data about meeting inside the DB, only then it would be possible to access it.
//The unique ID should be created by backend componenet to ensure full data and process security. 
//THE ID INSIDE DB MUST BE SAME AS UUID!!!


//creating the unique ID for React Router
//
//the mechanism should work using {name} + {exact-hour-also-with-ms} hash it using SHA512
//then take 6 first letters of hashed text - it gives us 35^6 possibilities of unique code
//it is nearly 2 bilion different codes
// 

#[ic_cdk::query]
fn unique_ID(name_of_meeting: String) -> String{
    let mut i = 0;
    let mut flag = true;
    let mut uuid: String = "error".to_string();
    while flag{

        let whole_string = format!("{}", name_of_meeting);
        let mut hash = Sha512::new();
        hash.update(whole_string);
        //let mut rng = rand::thread_rng();
        //let random_number: u32 = rng.gen_range(1000000..=999999);
        let hash_result = hash.finalize();
        let hash_string = format!("{:x}",hash_result);
        let final_string = format!("{}{}",hash_string,i.to_string());
        uuid = final_string.chars().take(6).collect::<String>();
        i+=1;
        let tmp = uuid.clone();
        flag = check_if_ID_is_Unique(tmp);
    };
    uuid
}

#[ic_cdk::query]
fn check_if_ID_is_Unique(uuid: String) -> bool {
    let mut flag = false;
    DB.with(|db| {
        let db = db.borrow();
        for (ID, data) in db.iter() {
            if *ID == uuid{
                flag = true;
                break;
            }
        }
    });
    flag
}

//because of the fact that reworing data would nit be necessary during phase
//of adding a meeting to a database we can perform the other thing that
//will also help us later with tasks including adding data about users
//the script besides data would be nearly the same

//now the problem is the build is taking forever - possible solutions:
//plug into electricity - battery too low
//rerun system - restart wsl - ports occupied

//solution for the date_data component - collect a tab

#[ic_cdk::query]
fn add_date_data(uuid: String, front_day_data: Vec<String>, front_month_data: Vec<String>, front_year_data: Vec<String>){
    //here need to be wrritten a component that adds date data in particular structure (defined inside Date struct)
    //to a meeting with told uuid 
    DB.with(|db| {
        let mut db = db.borrow_mut();

        if let Some(meeting) = db.get_mut(uuid) {
            const n = front_day_data.len();
            let mut i = 0; 
            while i < n {
                meeting.date_data.push(Date {
                    year: front_year_data[i],
                    month: front_month_data[i],
                    day: front_day_data[i],
                });
                i+=1;
            };
        };
    });
}

//end
//adding a meeting

#[ic_cdk::update]
fn add_meeting(uuid: String, front_name: String,
            front_starting_hour: u8, front_ending_hour: u8,
            front_description: String){

    DB.with(|database|{
        let mut db = database.borrow_mut();
        db.insert(uuid, Meeting{
            name: front_name,
            starting_hour: front_starting_hour,
            ending_hour: front_ending_hour,
            description: front_description,
            //data about dates need to be previously structurised to fit
            date_data: vec![],
            users_data: vec![],
        });
    });
}

//end

//adding a user to the meeting
//uuid is a id of the meeting
//adding an user:
//to backend there is passed no longer a matrix but a table like that:
//[3, 5, 7, 9, 11, 12, 13, 14, 15, 16, 17, 106, 109, 110, 111, 112, 113, 114, 115, 116, 202, 203, 204, 205, 206, 207, 208, 209, 210]
//those numbers with 100*0 adden represent next days!!! 

//storing information inside backend:
//inside a struct named Dates /ref
//HERE DATA NEEDS TO BE FUNDAMENTALLY REWORKED
//from a single table to a matrix that is stored by the Dates struct

//second option:
//store data as it is and process it in frontend 

#[ic_cdk::query]
fn availability_data_rework(availability: Vec<Vec<u8>>){
    pass
}

#[ic_cdk::update]
fn add_user(uuid: String, public_user_key: String, user_name: String, availability: Vec<u32>){
    pass
}

//end

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