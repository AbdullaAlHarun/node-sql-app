const bcrypt = require('bcryptjs');

const hashedPassword = "$2a$10$0n9cUDXthqzjhXgNBczWD.VxhrkGxYdQXscT7mZ2TqERKHrvA4DV2";
const inputPassword = "Password123";

bcrypt.compare(inputPassword, hashedPassword, (err, result) => {
    if (err) {
        console.error('Error comparing passwords:', err);
        return;
    }

    if (result) {
        console.log('✅ Password matches!');
    } else {
        console.log('❌ Password does NOT match.');
    }
});
