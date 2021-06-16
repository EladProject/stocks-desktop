class DBFactory {
    static getDB() {
        //return new DBJsonBin();
        return new DBFile();
    }
}