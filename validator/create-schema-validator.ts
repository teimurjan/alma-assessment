import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

export const createSchemaValidator = () => {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  addErrors(ajv);

  return ajv;
};
