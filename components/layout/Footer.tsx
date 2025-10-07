export const Footer = () => {
    return (
        <footer className="py-4 border-t border-brand-text-muted/50 text-brand-text-muted text-sm">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                <p>© {new Date().getFullYear()} DailyBlock. All rights reserved.</p>

                <div className="menus ml-auto">
                    <a href="#" className="mx-2">Privacy</a>
                    <a href="#" className="mx-2">Terms</a>
                </div>
            </div>
        </footer>
    );
};
