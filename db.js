
const mysql=require('mysql2')

const conn=mysql.createConnection({
    host : 'localhost',
    user:'root',
    password:'@Madhu2001',
    database:'emp_mgt_sys'
}
    
)

conn.connect((err)=>{
    if(err){
    console.log('error')
    }else{
        console.log('connected to database server on ')
    }
})

module.exports=conn