
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const data = await request.json();
        const filepath = path.join(process.cwd(), 'data.json');
        
        // check if file exist
        let fileData = [];
        if (fs.existsSync(filepath)) {
            const fileContent = fs.readFileSync(filepath);
            fileData = JSON.parse(fileContent.toString());
        }
        
        // add data
        fileData.push({
            "Questions": data.Question,
            "Answers": data.Answers
        });
        
        // write file
        fs.writeFileSync(filepath, JSON.stringify(fileData, null, 2));
        
        return new Response(JSON.stringify({ success: true }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
