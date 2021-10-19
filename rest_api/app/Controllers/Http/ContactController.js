'use strict'
const Database = use('Database')

class ContactController {

    async getContact({request, response}) {
        let { page, start, end, test_state, phone, email, age, learned } = request.all()

        if (!page) {page = 1}
        const limit = 50;

        let contactList = Database.table('contact')
        // .leftJoin('test_history', 'test_history.contact_id', 'contact.id')
        .distinct('contact.phone')
        .select('contact.name', 'contact.phone', 'contact.learned', 'contact.age', 'contact.email', 'contact.created_at')
        .orderBy('contact.created_at', 'desc')

        if (start) {
            contactList.where('contact.created_at', '>', start + ' 00:00:00')
        }

        if (end) {
            contactList.where('contact.created_at', '<', end + ' 23:59:59')
        }

        // if (test_state) {
        //     if (test_state == '1') {
        //         contactList.whereNotNull('test_history.id')
        //     }
            
        //     if (test_state == '2') {
        //         contactList.whereNull('test_history.id')
        //     }
        // }

        if (phone) {
            contactList.where('contact.phone', phone)
        }

        if (email) {
            contactList.where('contact.email', email)
        }
        
        if (age) {
            contactList.where('contact.age', age)
        }
        
        if (learned) {
            contactList.where('contact.learned', learned)
        }

        return response.json({
            code: 1,
            data: await contactList.paginate(page, limit)
        })
    }
    
    async getContactTracking({request, response}) {
        let { page, start, end, phone, utm_source, utm_medium, utm_campaign, utm_term } = request.all()

        if (!page) {page = 1}
        const limit = 50;

        let contactList = Database.table('contact_history')
        .join('contact', 'contact_history.contact_id', 'contact.id')
        .select('contact.name', 'contact.phone', 'contact_history.utm_source', 'contact_history.utm_medium', 'contact_history.utm_campaign', 'contact_history.utm_term', 'contact_history.created_at')
        .orderBy('contact_history.created_at', 'desc')

        if (start) {
            contactList.where('contact_history.created_at', '>', start + ' 00:00:00')
        }

        if (end) {
            contactList.where('contact_history.created_at', '<', end + ' 23:59:59')
        }

        if (phone) {
            contactList.where('contact.phone', phone)
        }

        if (utm_source) {
            contactList.where('contact_history.utm_source', utm_source)
        }
        
        if (utm_medium) {
            contactList.where('contact_history.utm_medium', utm_medium)
        }
        
        if (utm_campaign) {
            contactList.where('contact_history.utm_campaign', utm_campaign)
        }
        
        if (utm_term) {
            contactList.where('contact_history.utm_term', utm_term)
        }

        return response.json({
            code: 1,
            data: await contactList.paginate(page, limit)
        })
    }
}

module.exports = ContactController
