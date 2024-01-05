import { Button } from "@material-tailwind/react";

const LadingButton = ({ loading, children, ...props }) => {
    return (
        <Button
            {...props}
            disabled={loading}
            loading={loading}
            className="w-full"
        >
            {children}
        </Button>
    );
}