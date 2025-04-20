import { Webhook } from 'svix';
import User from '../models/User.js';

export const clerkWebhooks = async (req, res) => {
    try {
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        };

        if (!headers['svix-id'] || !headers['svix-timestamp'] || !headers['svix-signature']) {
            return res.status(400).json({ success: false, message: 'Missing Svix headers' });
        }

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const payload = req.body.toString('utf8'); // assuming you're using bodyParser.raw
        await whook.verify(payload, headers);

        const { data, type } = JSON.parse(payload); // parse raw body

        console.log(`Webhook event received: ${type}`);

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                    resume: ''
                };
                await User.create(userData);
                return res.status(200).json({});
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                };
                await User.findByIdAndUpdate(data.id, userData);
                return res.status(200).json({});
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                return res.status(200).json({});
            }

            default:
                return res.status(400).json({ success: false, message: 'Unhandled event type' });
        }

    } catch (error) {
        console.error('Webhook Error:', error.message);
        return res.status(500).json({ success: false, message: 'Webhook error!' });
    }
};
