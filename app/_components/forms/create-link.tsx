"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

const formSchema = z.object({
	link: z
		.string()
		.min(3, "at least 3 characters")
		.max(20, "maximum length for your link is 20 characters")
		.nonempty("please enter a username for create your link"),
});

const CreateNewLink = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			link: "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
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
										placeholder="username"
										maxLength={20}
										{...field}
										className="border-b-2 ml-1"
									/>
									<Button className="ml-2 flex items-center gap-1">
										<Link className="w-5 h-5" />
										<span>create</span>
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default CreateNewLink;
