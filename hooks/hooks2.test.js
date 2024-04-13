import { it, expect, beforeAll, beforeEach, afterAll, afterEach } from "vitest";

import { User } from "./hooks";

const testEmail = "test@test.com";
// let user;

let user = new User(testEmail);

/*
The test number 3 has failed because our testing file is a standard Javascript file in the end.
And all the codes there executes according to standard JavaScript rules.
And in the end with all those "it" functions here, We are just registering a bunch of tests which are 
all registered with each other. 
Now, that means that we refactored the code below by using global user and the global testEmail.
The test 3 does no longer initialize the user for this test. Instead we are using the global user.
And all the tests that were registered prior to this test did manipulate that user object already. 

Specifically, the first test did assign a new email address instead of the original email address.
And since the 3 test was executed after the first test and was registered after the first test. 
This updated email address is not stored when the 3 test executes.
Therefore the updated email indeed doesn't match the original test email address anymore.

This problem can be solved by hooks.
----------------------------------------------------------------
1- We need to import beforeAll, beforeEach, afterEach, afterAll from vitest. 
2- Now these functions can be executed to register other functions that should be executed either
before all tests run, before every single test or after every single test or after all tests executed.
3- We will need to add them by executing beforeAll.
4- Then you pass a function to beforeAll() and that's the function that will be executed once before
all the tests are executed.
5- The code within the before all function will be> console.log(beforeAll) so that we can see 
that this function executed. And it only executed once.
6- Now we also have beforeEach() and we will pass a function to beforeEach.
7- We can do the same with afterEach() and afterAll().

You can add these hooks directly into your test file.
Though, if you would have a file with multiple testing suites, you could also add them on
a suite level.

So inside of that describe function which you saw early in the course already.
Note >>>> If you applied these hooks into a suite, they will apply only to that suite.

However, if you applied them directly to the overall test file, then they will apply to all the 
tests in the file. 

Back to our failing test:
-------------------------
1- Reset our user after every test. So that changes made to the user in one test don't affect any
other tests.
2- AfterEach() hook is perfect for that.
3- Within its function, we will need to set the User to a new email again.
3- Since we are assiging a new value to User, We should change the global user from constant to 
variable so that we can assign a new value to the new user within afterEach().

Alternatively:
we could create a new user before every new test using beforeEach().
This will be equalivant as we can either clean after a test or right before the next test.
Either way, we will be working with a valid user.

Note:
We might add the new user email within beforeAll() however this will work as a global user.
But bear in mind that , we might sometimes have multiple suites and you might not want a glue global value 
in the overall testing file. But instead you might want to have some general shared value for a specific suite.
And maybe multiple suites should share the same variable with different values.
You could declare a global variable globally in your file: "let user;" instead of let user = new User(testEmail)
Then define it and set a value locally inside beforeAll(){user = new User(testEmail)}.

---- afterALL() => Could be great for general clean up work.(testing database before all your tests
  are executed) and once your tests finished, you want to erase that database. So that nothing is saved 
  on your file system. Then we can perform clean up work in afterAll.
*/

/*
How to run your test concurrently (concurrent tests):
---------------------------
1- You can call a method on "it.concurrent(description")  
It will be basically like an annotation to it.
If you add this concurrent annotation to it in your test, then this test will be run concurrently.
So it parallel with all other tests that have this annotation.
---Concurrent method can speed things up when you have lots of tests.

2- You can add to the concurrent method to the describe()


*/
beforeAll(() => {
  // user = new User(testEmail);
  console.log("beforeAll()");
});

beforeEach(() => {
    user = new User(testEmail);
  console.log("beforeEach()");
});

afterEach(() => {
  //   user = new User(testEmail);
  console.log("afterEach()");
});

afterAll(() => {
  console.log("afterAll()");
});

// describe.concurrent();

it.concurrent("should update the email", () => {
  const newTestEmail = "test2@test.com";

  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it("should have an email property", () => {
  expect(user).toHaveProperty("email");
});

it("should store the provided email value", () => {
  expect(user.email).toBe(testEmail);
});

it("should clear the email", () => {
  user.clearEmail();

  expect(user.email).toBe("");
});

it("should still have an email property after clearing the email", () => {
  user.clearEmail();

  expect(user).toHaveProperty("email");
});
