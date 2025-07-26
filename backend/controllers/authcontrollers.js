// import bcrypt from "bcrypt"; 
// import usermodel from "../models/usermodel.js";
// import jwt from "jsonwebtoken";


// export const regcontrol = async (req, res) => {
   
//     const { name, email, password, phone, address } = req.body;

//     //hash password
//     // const hashpass = await bcrypt.hash(password, 10);
//     // console.log(hashpass);
    
//     //create a new user and save to db
//     try {
//             // Hash password
//             const hashpass = await bcrypt.hash(password, 10);
//             // console.log(hashpass);
//             if (!name || !email || !password || !phone || !address) {
//                 return res.status(400).send('All fields are required');
//             }
//             console.log('Request body:', req.body);
//             // Create a new user and save to DB
//             console.log('Data to be inserted:', { name, email, password: hashpass, phone, address });
//             const preuser = await usermodel.findOne({email});
//             console.log(preuser);
//             if(preuser){
//                 res.status(422).json({error: "the user already exists"});
//             }
//             const user = await usermodel.create({
//                 name,
//                 email,
//                 password: hashpass,
//                 phone,
//                 address,
//             });
//             console.log('User created:', user);
//             res.status(201).send('User created successfully');
//         } catch (error) {
//             console.error('Error creating user:', error);
//             res.status(500).send('Failed to create user');
//         }
//     };
    
// //     const user = await usermodel.create({
// //         name: name,
// //         email: email,
// //         password: hashpass,
// //         phone: phone,
// //         address: address
// //     });
// //    console.log(user);
// // };

// export const logincontrol = async (req, res) => {
//     const { email, password } = req.body;
//     // console.log(req.body);

//     try {
//         // Log request body and extracted email/password
//         console.log("Request body:", req.body);
    
//         // const email = req.body.email;
//         //const password = req.body.password;
    
//         // console.log("Email:", email);
//         // console.log("Password:", password);
//         //console.log(usermodel);
//         // Check if user exists
//         const user = await usermodel.findOne({ email });
//         console.log("User fetched:", user);

//         if (!user) {
//             console.log("No user found with the provided email.");
//             return res.status(400).send("Invalid email or password"); 
//         }
//         // Compare password with hashed password in DB
//         // if (!password || !user.password) {
//         //     console.error("Password or hashed password missing");
//         //     return res.status(400).send("Invalid email or password");
//         // }
//         const isvalidpass = await bcrypt.compare(password, user.password);
//         console.log("Password validation result:", isvalidpass);

//         if (!isvalidpass) {
//             return res.status(400).send("Invalid email or password");
//         }
//         const age = 1000 * 60 * 60 * 24 * 7;
        
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY , { expiresIn: age }); 
//         user.token = user.token.concat({ token: token });
//         await user.save();
//         // Create token and generate cookie
//         res.cookie("token", token , {
//             httpOnly: true,
//             maxAge: age,
//             // secure: true, // Uncomment for secure HTTPS cookie
//         }).status(200).json({token});
//         // console.log(token);
//     }
//     catch (error) {
//         console.error("Error occurred:", error);
//         return res.status(500).send("An error occurred on the server.");
//     }    
// };

// export const logoutcontrol = (req, res) => {
//     res.clearCookie("token").status(200).json({message : "logout successfully"});
// };

