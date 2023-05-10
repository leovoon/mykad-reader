import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const runFile = `${__dirname}/tools/run.bat`
export const outputFile = `${__dirname}/tools/output.txt`
export const outputUserFile = `${__dirname}/tools/user.json`
export const patterns = [
    { key: 'Name', pattern: /Name:\s+(.*)/ },
    { key: 'IC', pattern: /IC:\s+(.*)/ },
    { key: 'Sex', pattern: /Sex:\s+(.*)/ },
    { key: 'Old IC', pattern: /Old IC:\s*(.?)\s/ },
    { key: 'DOB', pattern: /DOB:\s+(.*)/ },
    { key: 'State of birth', pattern: /State of birth:\s+(.*)/ },
    { key: 'Validity Date', pattern: /Validity Date:\s+(.*)/ },
    { key: 'Nationality', pattern: /Nationality:\s+(.*)/ },
    { key: 'Ethnic/Race', pattern: /Ethnic\/Race:\s+(.*)/ },
    { key: 'Religion', pattern: /Religion:\s+(.*)/ },
    { key: 'Address', pattern: /Address:\s+([\s\S]*?)(?=Reading JPN file 5)/m },
]
