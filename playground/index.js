
const getAIPromptResponse = async (promptFromUser = '' ) => {
    try {
        
        
        const data = await response.json();
        return data
    } catch (er) {
        console.log('Prompt error', er);
    }
}
const promptText = 'joke for the day' 
const getRes = await getAIPromptResponse(promptText)