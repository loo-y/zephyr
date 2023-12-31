import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'langchain/llms/openai' // azure openai
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import * as dotenv from 'dotenv'
dotenv.config()

const {
    azureOpenAIApiKey,
    azureOpenAIApiInstanceName,
    azureOpenAIApiDeployment_GTP35Turbo,
    azureOpenAIApiDeployment_GTP35Turbo16k,
    azureOpenAIApiDeployment_TextDavinci003,
    azureOpenAIApiDeployment_GTP4,
    azureOpenAIApiDeployment_TextEmbeddingAda002,
    azureOpenAIApiVersion,
} = process.env || {}

enum AZURE_MODELS {
    GPT4 = `gpt-4`,
    GPT35Turbo = `gpt-35-turbo`,
    TextDavinci003 = `text-davinci-003`,
    TextEmbeddingAda002 = `text-embedding-ada-002`,
}
// *** 👇 GPT4 👇 ***
const params_GPT4 = {
    modelName: AZURE_MODELS.GPT4,
    azureOpenAIApiKey,
    azureOpenAIApiInstanceName,
    azureOpenAIApiDeploymentName: azureOpenAIApiDeployment_GTP4,
    azureOpenAIApiVersion,
}
const modelGPT4 = new OpenAI({
    temperature: 0.9, // random
    ...params_GPT4,
    maxTokens: 1000,
})
// @ts-ignore azure 不支持bestOf
modelGPT4.bestOf = undefined

const modelChatGPT4 = new ChatOpenAI({
    temperature: 0.2, // stable
    topP: 0.3, // some stable
    ...params_GPT4,
    // maxTokens: 1000,
})
// @ts-ignore azure 不支持bestOf
modelChatGPT4.bestOf = undefined
// *** 👆 GPT4Turbo 👆 ***

// *** 👇 GPT35Turbo 👇 ***
const params_GPT35Turbo = {
    modelName: AZURE_MODELS.GPT35Turbo,
    azureOpenAIApiKey,
    azureOpenAIApiInstanceName,
    azureOpenAIApiDeploymentName: azureOpenAIApiDeployment_GTP35Turbo16k,
    azureOpenAIApiVersion,
}
const modelGPT35Turbo = new OpenAI({
    temperature: 0.9, // random
    ...params_GPT35Turbo,
    maxTokens: 1000,
})
// @ts-ignore azure 不支持bestOf
modelGPT35Turbo.bestOf = undefined

const modelChatGPT35Turbo = new ChatOpenAI({
    temperature: 0.2, // stable
    topP: 0.3, // some stable
    ...params_GPT35Turbo,
    // maxTokens: 1000,
})
// @ts-ignore azure 不支持bestOf
modelChatGPT35Turbo.bestOf = undefined
// *** 👆 GPT35Turbo 👆 ***

// *** 👇 TextDavinci003 👇 ***
const params_TextDavinci003 = {
    modelName: AZURE_MODELS.TextDavinci003,
    azureOpenAIApiKey,
    azureOpenAIApiInstanceName,
    azureOpenAIApiDeploymentName: azureOpenAIApiDeployment_TextDavinci003,
    azureOpenAIApiVersion,
}

const modelTextDavinci003 = new OpenAI({
    temperature: 0.9, // random
    ...params_TextDavinci003,
    maxTokens: 1000,
})
// @ts-ignore azure 不支持bestOf
modelTextDavinci003.bestOf = undefined

const modelChatTextDavinci003 = new ChatOpenAI({
    temperature: 0, // stable
    topP: 0.3, // some stable
    ...params_TextDavinci003,
    maxTokens: 1000,
})
// @ts-ignore azure 不支持bestOf
modelChatTextDavinci003.bestOf = undefined
// *** 👆 TextDavinci003 👆 ***

// *** 👇 TextEmbeddingAda002 👇 ***
const modelTextEmbeddingAda002 = new OpenAIEmbeddings({
    // modelName: AZURE_MODELS.TextEmbeddingAda002,
    azureOpenAIApiKey,
    azureOpenAIApiInstanceName,
    azureOpenAIApiDeploymentName: azureOpenAIApiDeployment_TextEmbeddingAda002,
    azureOpenAIApiVersion,
})
// *** 👆 TextEmbeddingAda002 👆 ***
const inputTokenLimitation = {
    embeddings: 8191,
}
export {
    modelGPT35Turbo,
    modelChatGPT35Turbo,
    modelTextDavinci003,
    modelChatTextDavinci003,
    modelTextEmbeddingAda002,
    inputTokenLimitation,
}
