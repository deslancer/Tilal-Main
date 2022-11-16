
export default async function getCSV() {
    let response = await fetch('https://docs.google.com/spreadsheets/d/1lRRrRoQCW-GSfn2Vwdy95X5goTGT97NM/export?format=csv');
    let data = [];
    if (response.ok) {
        let readableStream = await response.body;
        if (readableStream){
            const reader = readableStream.getReader();

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    console.log('Поток завершен.');
                    break;
                }
                let string = new TextDecoder().decode(value);
                string = string.replace(/[\u{0080}-\u{FFFF}]/gu,"");
                data = csvJSON(string);
            }
        }
    return data;
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}
function csvJSON(csv: string) {
    const lines = csv.split('\n')
    const result = []
    const headers = lines[0].split(',')
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i])
            continue
        const obj: any = {}
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            if(headers[j] && currentline[j]){
                let header = headers[j]
                    .replace(/^[^a-z]+\//i, '')
                    .replace(/\//g, '')
                    .replace(/\s+/g, '')
                console.log(header)

                obj[header] = currentline[j]
            }
        }
        result.push(obj)
    }
    return result
}