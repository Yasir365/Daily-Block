import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

// Handle post interactions (like, repost, share)
export async function POST(req: NextRequest, { params }: any) {
  try {
    await connectDB();
    const { coin: postId } = params;
    const { userId, username, action } = await req.json();
    // Expected body: { userId: "ObjectId", username: "John", action: "like" | "repost" | "share" }

    if (!userId || !username || !action)
      return NextResponse.json(
        { success: false, message: "Missing userId, username or action" },
        { status: 400 }
      );

    const post = await Post.findById(postId);
    if (!post)
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );

    switch (action) {
      case "like": {
        const alreadyLiked = post.likes.some((id: any) => id.equals(userId));
        if (alreadyLiked) {
          // Unlike
          post.likes = post.likes.filter((id: any) => !id.equals(userId));
        } else {
          // Like
          post.likes.push(userId);
        }
        break;
      }

      case "repost": {
        const alreadyReposted = post.reposts.some(
          (r: any) => r.userId.toString() === userId
        );
        if (alreadyReposted) {
          // Undo repost
          post.reposts = post.reposts.filter(
            (r: any) => r.userId.toString() !== userId
          );
        } else {
          // Add repost
          post.reposts.push({
            userId,
            username,
            createdAt: new Date(),
          });
        }
        break;
      }

      case "share": {
        post.shares.push({
          userId,
          username,
          sharedAt: new Date(),
        });
        break;
      }

      default:
        return NextResponse.json(
          { success: false, message: "Invalid action" },
          { status: 400 }
        );
    }

    await post.save();

    return NextResponse.json({
      success: true,
      message: `Post ${action} updated successfully`,
      data: post,
    });
  } catch (error: any) {
    console.error("Error interacting with post:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
