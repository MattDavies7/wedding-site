import express, { Request, Response } from "express";
import prisma from "../utils/db";

const router = express.Router();

// POST /api/rsvp - Create RSVP

router.post("/", async (req: Request, res: Response) => {
    try {
        const { name, email, attending } = req.body;

        //Validation
        if (!name || typeof attending !== "boolean") {
            return res
                .status(400)
                .json({ success: false, message: "Missing Required Fields" });
        };

        const rsvp = await prisma.rSVP.create({
            data: {
                name,
                email: email || null,
                attending,
            },
        });

        console.log(`New RSVP ${name} (${attending ? "attending" : "not attending"})`);

        res.json({ success: true, rsvp });
    } catch (err) {
        console.error("RSVP error", err);
        res.status(500).json({ success: false, message: "Server error."});
    }
});


// GET /api/rsvp - Fetch all RSVPs

router.get("/", async (_req: Request, res: Response) => {
    try {
        const allRSVPs = await prisma.rSVP.findMany({
            oderBy: { createdAt: "desc" },
        });
        res.json(allRSVPs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Could not fetch RSVPs" });
    }
});

export default router;