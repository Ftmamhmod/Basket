import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import { useState } from "react";

const ShareDialog = ({ product }) => {
  const shareUrl = `https://e-commerce-dusky-mu-65.vercel.app/category/${product.category}`;
  const shareTitle = `View this product: ${product.title}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer w-[50%]">
          🔗 Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Share Product</DialogTitle>
        </DialogHeader>

        <div className="flex justify-around py-2">
          <FacebookShareButton url={shareUrl} quote={shareTitle}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          <TelegramShareButton
            url={shareUrl}
            title={shareTitle}
            hashtags={["product", "share"]}
          >
            <TelegramIcon size={40} round />
          </TelegramShareButton>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            readOnly
            value={shareUrl}
            className="flex-1 px-3 py-2 border rounded-md text-sm text-gray-600  "
          />
          <Button
            onClick={handleCopy}
            variant="secondary"
            className="cursor-pointer"
          >
            {copied ? "✔️ copied" : "📋 copy"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
