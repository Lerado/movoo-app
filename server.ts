
import { serve } from "https://deno.land/std/http/mod.ts";
import { lookup } from "https://deno.land/x/media_types/mod.ts";

const BASE_PATH = "./dist/movoo-app";

const reqHandler = async (req: Request) => {
    const filePath = BASE_PATH + new URL(req.url).pathname;
    let fileSize;
    try {
        fileSize = (await Deno.stat(filePath)).size;
    } catch (e) {
        if (e instanceof Deno.errors.NotFound) {
            return new Response(null, { status: 404 });
        }
        return new Response(null, { status: 500 });
    }
    const body = (await Deno.open(filePath)).readable;
    return new Response(body, {
        headers: {
            "content-length": fileSize.toString(),
            "content-type": lookup(filePath) || "application/octet-stream",
        },
    });
};

serve(reqHandler);
