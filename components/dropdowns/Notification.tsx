import { Badge, Dropdown } from 'antd';
import { Bell, Link } from 'lucide-react'
import React from 'react'


const notifications = [
    { id: 1, title: 'BTC price just hit $70,000!', date: '2 hours ago' },
    { id: 2, title: 'New article posted in Blogs section.', date: '1 day ago' },
    { id: 3, title: 'You have 3 unread community messages.', date: '2 days ago' },
]

const notificationContent = (
    <div className="bg-gray-700 rounded-lg shadow-xl w-64 p-4 mt-2">
        <h4 className="text-white font-bold mb-3 border-b border-zinc-700 pb-2">Notifications</h4>
        {notifications.map((item) => (
            <div className="space-y-3 text-sm py-2 border-b border-brand-glass">
                <p className="text-brand-muted hover:text-white transition-colors cursor-pointer mb-0">
                    {item.title}
                </p>
                <p className='text-end text-xs text-brand-muted'>{item.date}</p>
            </div>
        ))}
        <Link href="/" className="block text-center mt-4 text-brand-yellow text-xs font-semibold hover:text-yellow-400">
            View All Notifications
        </Link>
    </div>
);

export default function Notifications() {
    return (
        <Dropdown
            overlay={notificationContent}
            trigger={['click']}
            placement="bottomRight"
            arrow
        >
            <button className="p-2 hover:bg-brand-yellow rounded-full transition-colors">
                <Badge count={3} size="small" offset={[-2, 2]}>
                    <Bell className="w-5 h-5 text-white" />
                </Badge>
            </button>
        </Dropdown>
    )
}
