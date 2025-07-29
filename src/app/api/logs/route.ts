import { NextRequest } from 'next/server';
import { spawn } from 'child_process';

export const runtime = 'nodejs';

export async function GET(req: NextRequest): Promise<Response> {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Añadimos --no-pager y formato simple para evitar problemas
      const proceso = spawn("journalctl", [
        "-u",
        "pythonIntegracionHioffice.service",
        "-f",
        "--no-pager",
        "--output=cat",
      ], { shell: true });

      let buffer = "";

      proceso.stdout.on("data", (chunk) => {
        buffer += chunk.toString();

        const lines = buffer.split("\n");

        // El último elemento puede ser línea incompleta, la guardamos para después
        buffer = lines.pop() || "";

        for (const line of lines) {
          // Enviar línea limpia (sin salto) al cliente SSE
          controller.enqueue(encoder.encode(`data: ${line}\n\n`));
        }
      });

      proceso.stderr.on("data", (chunk) => {
        const errorLines = chunk.toString().split("\n");
        for (const line of errorLines) {
          if (line.trim()) {
            controller.enqueue(encoder.encode(`data: [ERROR] ${line}\n\n`));
          }
        }
      });

      proceso.on("close", (code) => {
        controller.enqueue(encoder.encode(`data: [INFO] Proceso terminado con código ${code}\n\n`));
        controller.close();
      });

      req.signal.addEventListener("abort", () => {
        proceso.kill();
        controller.close();
      });
    }
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
