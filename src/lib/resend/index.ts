import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");
export default resend;
