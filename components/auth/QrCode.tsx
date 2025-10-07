const QRCode = "/svg/qr-code.svg";

export const QrCode = () => {
    const items = [
        "Open the Crypto.com App",
        "Tap Menu > Settings > QR Code Scanner",
        "Scan the QR Code above"
    ];
    return (
        <div className="mb-8 rounded-lg flex items-center justify-center gap-6">
            <div>
                <h2 className="text-2xl font-bold text-brand-text">Scan with your phone camera or the Crypto.com App to login instantly.</h2>
                <ol className="list-decimal list-inside space-y-2 mt-4">
                    Scan with App:
                    {
                        items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }
                </ol>
            </div>
            <img className="w-40 h-40 bg-gray-300 rounded-lg flex items-center justify-center text-black" src={QRCode} alt="Crypto Illustration" />
        </div>
    );
}