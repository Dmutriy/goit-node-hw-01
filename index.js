const contacts = require("./contacts");
const { program } = require("commander");

const invokeActions = async ({
  action,
  id,
  name,
  email,
  phone,
}) => {
  switch (action) {
    case "read":
      const allContacts = await contacts.getAll();
      return console.table(allContacts);
    case "getById":
      const oneContact = await contacts.getById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.add({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    case "updateById":
      const updateContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);
    case "deleteById":
      const deleteContact = await contacts.deleteById(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();
invokeActions(argv);

// invokeActions({ action: "read" });
// invokeActions({ action: "getById", id: "2" });
// invokeActions({
//   action: "add",
//   name: "Cam Morines",
//   email: "marines@mail.com",
//   phone: "555-111-222",
// });
// invokeActions({
//   action: "deleteById",
//   id: "JOAXSNpxSGJgUfQ1qOHRm",
// });
