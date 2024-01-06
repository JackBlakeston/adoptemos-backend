import * as fs from 'fs';
import * as path from 'path';
import { runStyledScript } from './scripUtils/styledScript.js';
import { __dirname } from './scripUtils/dirname.js';

const CAPITAL_LETTERS_REGEX = /([A-Z])/g;
const CLASS_PROPS_REGEX = /(\w+!?|\w+\??):\s*(\w+);/g;
const CLASS_PROPS_DECORATOR_REGEX = /[!?]/g;
const ROUTES_REGEX = /\[(Get|Post|Put|Delete|Patch),\s*'\/.*?\]/g;
const ROUTE_URL_REGEX = /'(\/.*?)'/;
const ROUTE_METHOD_REGEX = /\[(.*?),/;
const ROUTE_CONTROLLER_REGEX = /controller.(.*?)]/;
const ROUTE_DTO_REGEX = /DtoValidator\((.*?)\)/;

const NUMBER_OF_SPACES_IN_JSON = 2;
const FILE_ENCODING = 'utf8';

const COMPILED_MOCKS_PATH = '../lib/src/fixtures/MockEntities/Mock';
const DTOS_PATH = '../src/application/dtos/';
const ROUTERS_PATH = '../src/infrastructure/routes/Routers/';

const OUTPUT_PATH = '../src/docs/swaggerAutogen.json';

// Formatters
const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
const formatCamelCase = (text) => {
  const splitLowerCaseText = text.replace(CAPITAL_LETTERS_REGEX, ' $1').toLowerCase().trim();
  return capitalize(splitLowerCaseText);
};

// Regex generators
const createSuccessResponseRegex = (controllerMethodName) => {
  const pattern = controllerMethodName + '[\\s\\S]*?BaseController.*?, (\\d.*?)\\)';
  return new RegExp(pattern);
};
const createUseCaseRegex = (controllerMethodName) => {
  const pattern = controllerMethodName + '[\\s\\S]*?UseCases\\.(.*?)\\(';
  return new RegExp(pattern);
};
const createUseCaseReturnTypeRegex = (useCasesMethodName) => {
  const pattern = useCasesMethodName + '.*?Promise<(.*?)>';
  return new RegExp(pattern);
};

// File handling
const writeObjectToJsonFile = async (object, filename) => {
  try {
    const jsonData = JSON.stringify(object, null, NUMBER_OF_SPACES_IN_JSON);
    await fs.promises.writeFile(filename, jsonData, FILE_ENCODING);
    // console.log(`Data written to file ${filename}`);
  } catch (error) {
    throw new Error(`Error writing file: ${err}`);
  }
};
const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, FILE_ENCODING);
  } catch (error) {
    throw new Error(`Error reading file: ${err}`);
  }
};
const getSubfolderNames = async (directoryPath) => {
  try {
    const files = await fs.promises.readdir(directoryPath, { withFileTypes: true });
    const folderNames = files.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
    return folderNames;
  } catch (error) {
    throw new Error(`Error reading directory: ${error}`);
  }
};

// File data getters
const getControllerFileData = (entityName) => {
  const controllerName = entityName + 'Controller';
  const controllerPath = path.join(__dirname, `../src/application/controllers/${controllerName}/${controllerName}.ts`);
  return readFile(controllerPath);
};
const getUseCasesFileData = (entityName) => {
  const useCasesName = entityName + 'UseCases';
  const useCasePath = path.join(__dirname, `../src/core/domain/useCases/${useCasesName}/${useCasesName}.ts`);
  return readFile(useCasePath);
};
const getEntityFileData = (entityName) => {
  const entityPath = path.join(__dirname, `../src/core/domain/entities/${entityName}/${entityName}.ts`);
  return readFile(entityPath);
};
const getRouterFileData = (routerName) => {
  const routerPath = path.join(__dirname, `${ROUTERS_PATH}${routerName}/${routerName}.ts`);
  return readFile(routerPath);
};

// Helpers
const getRouterNames = async () => {
  const routersPath = path.join(__dirname, ROUTERS_PATH);
  return await getSubfolderNames(routersPath);
};
const getMocks = async (entityName) => {
  try {
    const module = await import(`${COMPILED_MOCKS_PATH}${entityName}.js`);
    return module;
  } catch (error) {
    throw new Error(`Error importing module for ${entityName}: ${error}`);
  }
};
const getBaseSchema = () => ({
  type: 'object',
  properties: {},
  required: [],
});
const getSchemaReducer =
  (mock) =>
  (schema, [, propName, propType]) => {
    const cleanPropName = propName.replace(CLASS_PROPS_DECORATOR_REGEX, '');

    schema.properties[cleanPropName] = {
      type: propType.toLowerCase(),
      example: mock[cleanPropName],
    };

    if (propName.endsWith('!')) {
      schema.required.push(cleanPropName);
    }

    return schema;
  };
const getBaseEntityType = (entityName, entityText) => {
  const baseEntityTypeRegex = new RegExp(entityName + ' extends BaseEntity(.*?) {');
  return entityText.match(baseEntityTypeRegex)?.[1];
};
const getSuccessResponseStatusCode = (controllerFileData, controllerMethodName) => {
  return controllerFileData.match(createSuccessResponseRegex(controllerMethodName))[1];
};
const getUseCaseReturnType = (controllerFileData, controllerMethodName, useCaseFileData) => {
  const useCasesMethodName = controllerFileData.match(createUseCaseRegex(controllerMethodName))[1];
  return useCaseFileData.match(createUseCaseReturnTypeRegex(useCasesMethodName))[1];
};
const getRoutesData = (routerName) => {
  const routerFileData = getRouterFileData(routerName);
  return routerFileData.match(ROUTES_REGEX) || [];
};
const getRouteElements = (routeData) => {
  const routeUrl = routeData.match(ROUTE_URL_REGEX)[1];
  const routeHttpMethod = routeData.match(ROUTE_METHOD_REGEX)[1].toLowerCase();
  const controllerMethodName = routeData.match(ROUTE_CONTROLLER_REGEX)[1];
  const dtoName = routeData.match(ROUTE_DTO_REGEX)?.[1];

  return { routeUrl, routeHttpMethod, controllerMethodName, dtoName };
};

// Schema parsers and generators
const parseDtoToSwaggerSchema = (dtoName, dtoText, mocks) => {
  const dtoMock = mocks[`mock${dtoName}`];
  const matches = Array.from(dtoText.matchAll(CLASS_PROPS_REGEX));

  return matches.reduce(getSchemaReducer(dtoMock), getBaseSchema());
};
const parseEntityToSwaggerSchema = (entityName, entityText, mocks) => {
  const entityMock = mocks[`mock${entityName}`];

  const matches = Array.from(entityText.matchAll(CLASS_PROPS_REGEX));
  const schema = matches.reduce(getSchemaReducer(entityMock), getBaseSchema());

  const baseEntityType = getBaseEntityType(entityName, entityText);

  const idSchemaProperty = {
    type: 'string',
    example: entityMock.id,
  };
  if (baseEntityType === 'WithUrl') {
    schema.properties.id = idSchemaProperty;
    schema.properties.url = { type: 'string', example: entityMock.url };
    schema.required.push('id', 'url');
  }
  if (baseEntityType === 'WithId') {
    schema.properties.id = idSchemaProperty;
    schema.required.push('id');
  }

  return schema;
};
const createResponseSchema = (useCaseReturnType) => {
  const isArrayType = useCaseReturnType.endsWith('[]');
  const baseType = isArrayType ? useCaseReturnType.slice(0, -2) : useCaseReturnType;
  const responseSchema = isArrayType
    ? {
        type: 'array',
        items: { $ref: `#/components/schemas/${baseType}` },
      }
    : { $ref: `#/components/schemas/${useCaseReturnType}` };

  return {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },
      data: responseSchema,
    },
  };
};

// Object generators
const createRequestBodyData = (entityName, dtoName, mocks) => {
  if (!dtoName) {
    return;
  }

  const dtoPath = path.join(__dirname, `${DTOS_PATH}${entityName}/${dtoName}/${dtoName}.ts`);
  const fileData = readFile(dtoPath);
  const schema = parseDtoToSwaggerSchema(dtoName, fileData, mocks);

  return {
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema,
        },
      },
    },
  };
};
const createResponseData = (entityName, controllerMethodName) => {
  const controllerFileData = getControllerFileData(entityName);
  const useCasesFileData = getUseCasesFileData(entityName);

  const successResponseStatus = getSuccessResponseStatusCode(controllerFileData, controllerMethodName);
  const useCaseReturnType = getUseCaseReturnType(controllerFileData, controllerMethodName, useCasesFileData);

  const schema = createResponseSchema(useCaseReturnType);

  return {
    responses: {
      [successResponseStatus]: {
        content: {
          'application/json': {
            schema,
          },
        },
      },
    },
  };
};

// Main logic
const addTagToDocs = (entityName, swaggerDocument) => {
  const newTag = {
    name: entityName,
  };
  const previousTags = swaggerDocument.tags;
  swaggerDocument.tags = previousTags ? [newTag, ...previousTags] : [newTag];
};
const addComponentToDocs = (entityName, mocks, swaggerDocument) => {
  const entityFileData = getEntityFileData(entityName);
  const entitySchema = parseEntityToSwaggerSchema(entityName, entityFileData, mocks);

  swaggerDocument.components = {
    ...swaggerDocument.components,
    schemas: {
      ...swaggerDocument.components?.schemas,
      [entityName]: entitySchema,
    },
  };
};
const addDataFromRouteToDocs = (entityName, mocks, swaggerDocument) => (routeData) => {
  const { controllerMethodName, dtoName, routeHttpMethod, routeUrl } = getRouteElements(routeData);

  const routeSummary = formatCamelCase(controllerMethodName);
  const requestBody = createRequestBodyData(entityName, dtoName, mocks);
  const responses = createResponseData(entityName, controllerMethodName);

  swaggerDocument.paths = {
    ...swaggerDocument.paths,
    [routeUrl]: {
      ...swaggerDocument.paths?.[routeUrl],
      [routeHttpMethod]: {
        summary: routeSummary,
        tags: [entityName],
        ...requestBody,
        ...responses,
      },
    },
  };
};
const addDataFromRouterToDocs = (swaggerDocument) => async (routerName) => {
  const entityName = routerName.split('Router')[0];
  const mocks = await getMocks(entityName);
  addTagToDocs(entityName, swaggerDocument);
  addComponentToDocs(entityName, mocks, swaggerDocument);

  const routesData = getRoutesData(routerName);
  routesData.forEach(addDataFromRouteToDocs(entityName, mocks, swaggerDocument));
};

const createSwaggerDocsObject = async () => {
  const swaggerDocument = { openapi: '3.0.0' };

  const routerNames = await getRouterNames();
  await Promise.all(routerNames.map(addDataFromRouterToDocs(swaggerDocument)));

  return swaggerDocument;
};

const autoGenerateDocs = async () => {
  try {
    const swaggerDocument = await createSwaggerDocsObject();
    await new Promise((resolve) => setTimeout(() => resolve(), 900));
    const autodocDir = path.join(__dirname, OUTPUT_PATH);
    await writeObjectToJsonFile(swaggerDocument, autodocDir);
  } catch (error) {
    console.error('Failed to generate Swagger documentation: ', error);
    process.exit(1);
  }
};

runStyledScript({
  startMsg: 'Generating automatic swagger docs',
  successMsg: 'Swagger docs generated successfully',
  failMessage: 'Error while generating swagger docs',
  shouldBubbleError: true,
  script: autoGenerateDocs,
});
