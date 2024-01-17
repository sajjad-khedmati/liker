"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// icons
import { Link, Loader } from "lucide-react";
// components
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
// actions
import createLink from "@/app/_actions/create-link";
const formSchema = z.object({
	link: z
		.string()
		.min(3, "public link at least 3 characters")
		.max(20, "maximum length for your link is 20 characters")
		.refine(
			(string) => !string.includes("/") && !string.includes("\\"),
			`your link has not include / or "\\" char , please remove it or choose a diffrent link`,
		)
		.refine(
			(string) => !string.includes(" "),
			"Please make sure your public link has no spaces, if you do we recommend using - or _ instead",
		),
});

const CreateNewLink = () => {
	// toast
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			link: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const result = await createLink(values);
			if (result?.error) {
				return toast({
					variant: "destructive",
					title: result?.message,
					description: result?.description,
				});
			} else {
				form.reset();
				return toast({
					variant: "success",
					title: result?.message,
					description: result?.description,
				});
			}
		} catch (error: any) {
			if (error) {
				return toast({
					variant: "destructive",
					title: error?.message,
					description: error?.description,
				});
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="link"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center">
									<p>linker.io/</p>
									<Input
										placeholder="your profile link"
										maxLength={20}
										{...field}
										className="border-b-2 ml-1"
									/>
									<Button
										disabled={form.formState.isSubmitting}
										className="ml-2 flex items-center gap-1"
									>
										{form.formState.isSubmitting ? (
											<Loader className="w-5 h-5 animate-spin duration-500" />
										) : (
											<Link className="w-5 h-5" />
										)}
										<span>create</span>
									</Button>
								</div>
							</FormControl>
							<FormMessage className="text-xs" />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default CreateNewLink;
